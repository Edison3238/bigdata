import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  progressValue = 0;
  loading = true;

  edad = -0.0018820165;
  sexo = -0.0446416365;
  bmi = -0.0514740612;
  bp = -0.0263278347;
  s1 = -0.0084487241;
  s2 = -0.0191633397;
  s3 = 0.0744115641;
  s4 = -0.0394933829;
  s5 = -0.0683297436;
  s6 = -0.0683297436;

  prediccion: any = 'Waiting...';

  constructor(private http: HttpClient) {}

  postData(data: any) {
    const url = 'http://localhost:3000/predecir';
    return this.http.post(url, data);
  }
  bress(valor: any) {
    this.progressValue = valor;
  }
  ngOnInit() {
    setInterval(() => {
      if (this.progressValue === 100) {
        this.progressValue = 0;
      }
      this.progressValue = this.prediccion;
    }, 500);
  }

  consultar() {
    const data = {
      var0: this.edad,
      var1: this.sexo,
      var2: this.bmi,
      var3: this.bp,
      var4: this.s1,
      var5: this.s2,
      var6: this.s3,
      var7: this.s4,
      var8: this.s5,
      var9: this.s6,
    };
    this.postData(data).subscribe((response: any) => {
      this.prediccion = response.res.predict[0];
      
      console.log(response.res.predict[0]);
    });
    
    
  }
}
