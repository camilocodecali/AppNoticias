import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias:Article[] = [];

  constructor(private noticiasServie: NoticiasService) {

  }

  ngOnInit(){
    this.cargarNoticias();
  }
  loadData( event ){

    this.cargarNoticias( event );
  }

  cargarNoticias( event?){
    this.noticiasServie.getTopHeadLines().subscribe(
      resp=> { 
        console.log('noticias', resp);

        if(resp.articles.length === 0 ){
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.noticias.push( ...resp.articles );

        if(event){
          event.target.complete();
        }
        
      }
    );
  }

}
