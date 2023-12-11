import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {ReservaControllerService} from "../../../api/services/reserva-controller.service";
import {ReservaDto} from "../../../api/models/reserva-dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  formGroup!: FormGroup;
  colunasMostrar = ['nome','dataReserva','acao'];
  reservaListaDataSource : MatTableDataSource<ReservaDto> = new MatTableDataSource<ReservaDto>([]);


  constructor(
    private formBuilder: FormBuilder,
    public reservaService: ReservaControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      dataReserva: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.buscarDados();
  }


   buscarDados() {
    this.reservaService.listAll().subscribe(data => {
      console.log(data);
      this.reservaListaDataSource.data = data;
    })
  }

  remover(reservaDto: ReservaDto) {
    console.log("Removido", reservaDto.id);
    this.reservaService.remover({id: reservaDto.id || 0})
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


  confirmarExcluir(reservaDto: ReservaDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${reservaDto.nomeCliente}?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: reservaDto
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
pesquisar(){
  if (this.formGroup.valid) {
    console.log("Dados:",this.formGroup.value);
    this.reservaService.pesquisar({body: this.formGroup.value})
      .subscribe( retorno =>{
        console.log("Retorno:",retorno);
        this.reservaListaDataSource.data = retorno;
      }, erro =>{
        console.log("Erro:"+erro);
        alert("Erro ao Pesquisar!");
      })
    }
  }
}


