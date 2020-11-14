import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ImagenesproductoService {
  header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZWxpbWluYWRvIjpmYWxzZSwiX2lkIjoiNWY4NTA2MmFlNjgxZWYwMDE3MTQ1N2Y0Iiwibm9tYnJlIjoiYWRtaW4iLCJkaXJlY2Npb24iOiJhZG1pbiIsInRlbGVmb25vIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjA1MjE1NjA0LCJleHAiOjE2MDUzODg0MDR9.czRa0yd6qAgK7S8A5LppW841oZ0AFYth0LKK1V5NGgc';
  
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
