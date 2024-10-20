import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  arregloNoticias: any = [
    {
      id: '',
      titulo: '',
      texto: ''
    }
  ]

  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
    //consulto por el estado de la base de datos
    this.bd.dbReady().subscribe(data=>{
      //verifico si esta disponible
      if(data){
        //me subcribo al observable del select de todas las noticias
        this.bd.fetchNoticias().subscribe(res=>{
          //guardar ese resultado en mi variable propia
          this.arregloNoticias = res;
        })
      }
    })
  }
  modificar(x:any){
    let navigationExtras: NavigationExtras = {
      state: {
        noticiaEnviada: x
      }
    }
    this.router.navigate(['/modificar'], navigationExtras);

  }
  eliminar(x:any){
    this.bd.eliminarNoticia(x.idnoticia);

  }
  irPagina(){
    this.router.navigate(['/agregar']);
  }

}
