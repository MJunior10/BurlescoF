import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FuncionariaDto} from "../../api/models/funcionaria-dto";
import {FuncionariaControllerService} from "../../api/services/funcionaria-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit  {

  colunasMostrar = ['nome', 'apelido', 'acao'];
  funcionariaListaDataSource : MatTableDataSource<FuncionariaDto> = new MatTableDataSource<FuncionariaDto>([]);
  constructor(
    public funcionariaService: FuncionariaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }
  private buscarDados() {
    this.funcionariaService.listAll().subscribe(data => {
      console.log(data);
      this.funcionariaListaDataSource.data = data;
    })
  }
}
