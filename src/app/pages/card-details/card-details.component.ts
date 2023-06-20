import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FuncionariaControllerService} from "../../api/services/funcionaria-controller.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FuncionariaDto} from "../../api/models/funcionaria-dto";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
  standalone: true,
  imports: [MatExpansionModule, RouterLink, MatTableModule],
})
export class CardDetailsComponent{

  id!: number;
  colunasMostrar = ['id', 'nome', 'apelido', 'valorAtendimento', 'supervisor','especialidade', 'dataNascimento','acao'];
  funcionariaListaDataSource : MatTableDataSource<FuncionariaDto> = new MatTableDataSource<FuncionariaDto>([]);
  constructor(

    private route: ActivatedRoute,
    public funcionariaService: FuncionariaControllerService,
    ) {
        this.obterInformações();
  }
  panelOpenState = false;


  private obterInformações()
  {
    const paramId = this.route.snapshot.paramMap.get('codigo');
    if(paramId) {
        const codigo = parseInt(paramId);
        console.log("codigo", paramId);
        this.funcionariaService.obterPorId({id:codigo}).subscribe(
          retorno =>{
            console.log("retorno", retorno);
            this.id = retorno.id;
            this.funcionariaListaDataSource.data = retorno;

          }
        )
    }


  }
}
