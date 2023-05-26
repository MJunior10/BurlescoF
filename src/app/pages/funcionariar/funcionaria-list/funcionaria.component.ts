import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FuncionariaDto} from "../../../api/models/funcionaria-dto";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FuncionariaControllerService} from "../../../api/services/funcionaria-controller.service";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-funcionaria',
  templateUrl: './funcionaria.component.html',
  styleUrls: ['./funcionaria.component.scss']
})
export class FuncionariaComponent  implements OnInit {
  colunasMostrar = ['id', 'nome', 'apelido', 'valorAtendimento', 'supervisor','especialidade', 'dataNascimento'];
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
      this.funcionariaListaDataSource.data = data;
    })
  }

  remover(FuncionariaDto: FuncionariaDto) {
    console.log("Removido", FuncionariaDto.id);
    this.funcionariaService.remover({id: FuncionariaDto.id || 0})
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
        mensagem: `A exclusão de: ${funcionariaDto.nome} (ID: ${funcionariaDto.id})?`,
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


