import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ImagenesproductoService {
  header = sessionStorage.getItem('accesToken');
  
  uploadForm: FormGroup;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  postImagen(imagen:any, id:any){
    const headers = new HttpHeaders({
      'Authorization': this.header
    });
    let url = 'https://api-protech.herokuapp.com/api/upload';
    this.uploadForm = this.formBuilder.group({
      imagen: ['']
    });
    const img = imagen;
    this.uploadForm.get('imagen').setValue(img);
    const formData = new FormData();
    formData.append('imagen', this.uploadForm.get('imagen').value);
    return this.http.post(url + '/' + id, formData, {headers});
  }

  deleteImagen(id: any)
  {
    const headers = new HttpHeaders({
      'Authorization': this.header
    });
    let url = 'https://api-protech.herokuapp.com/api/imagen/';

    return this.http.delete(url + id, {headers});
  }

}
