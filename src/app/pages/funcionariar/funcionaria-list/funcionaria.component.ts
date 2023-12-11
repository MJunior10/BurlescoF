import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FuncionariaControllerService} from "../../../api/services/funcionaria-controller.service";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {FuncionariaDto} from "../../../api/models/funcionaria-dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-funcionaria',
  templateUrl: './funcionaria.component.html',
  styleUrls: ['./funcionaria.component.scss']
})
export class FuncionariaComponent  implements OnInit {

  colunasMostrar = ['id', 'nome', 'apelido', 'valorAtendimento', 'supervisor','especialidade', 'dataNascimento','acao'];
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
    this.funcionariaService.listAll1().subscribe(data => {
      console.log(data);
      this.funcionariaListaDataSource.data = data;
    })
  }

  remover(funcionariaDto: FuncionariaDto) {
    console.log("Removido", funcionariaDto.id);
    this.funcionariaService.remover1({id: funcionariaDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ", 5000);
          console.log("Exclusão:", retorno);
        }, error => {
          if (error.status === 404) {
            this.showMensagemSimples("Funcionaria não existe mais")
          } else {
            this.showMensagemSimples("Erro ao excluir");
            console.log("Erro:", error);
          }
        }
      )
  }


  confirmarExcluir(funcionariaDto: FuncionariaDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${funcionariaDto.nome} ${funcionariaDto.apelido}?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: funcionariaDto
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.remover(confirmed.dado);
      }
    });


  }
  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }



}


