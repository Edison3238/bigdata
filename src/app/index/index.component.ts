import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  progressValue = 0;
  loading = true;
  respuesta = [];

  medias = [
    48.5180995, 1.4683258, 26.3757919, 94.6470136, 189.1402715, 115.4391403,
    49.7884615, 4.0702489, 4.6414109, 91.260181,
  ];
  stdDev = [
    13.1090278, 0.4995612, 4.4181216, 13.8312834, 34.6080517, 30.413081,
    12.9342022, 1.2904499, 0.5223906, 11.4963347,
  ];

  edad = 72111111;
  sexo = 2;
  bmi = 30.5;
  bp = 93.0;
  s1 = 156;
  s2 = 93.6;
  s3 = 41.0;
  s4 = 4.0;
  s5 = 4.6728;
  s6 = 850000;

  datos = [
    this.edad,
    this.sexo,
    this.bmi,
    this.bp,
    this.s1,
    this.s2,
    this.s3,
    this.s4,
    this.s5,
    this.s6,
  ];

  prediccion: any = 'Waiting...';
  prediccion2: any = 'Waiting...';

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

    this.datos = [
      this.edad,
      this.sexo,
      this.bmi,
      this.bp,
      this.s1,
      this.s2,
      this.s3,
      this.s4,
      this.s5,
      this.s6,
    ];


    console.log("ChatGPT      "+this.estandarizarChatGPT(this.datos))
  
    var datos1 = this.estandarizarChatGPT(this.datos)

     const data = {
      var0: datos1[0],
      var1: datos1[1],
      var2: datos1[2],
      var3: datos1[3],
      var4: datos1[4],
      var5: datos1[5],
      var6: datos1[6],
      var7: datos1[7],
      var8: datos1[8],
      var9: datos1[9],
    };
/*
 this.estandarizarEDI(this.datos);
    const data = {
      var0: 0.9521606500447,
      var1: 1.0642824935362,
      var2: 1.2729862833409,
      var3: 0.6523607500106,
      var4: 0.6027420642645,
      var5: -0.9942807274949,
      var6: -1.14336094035,
      var7: 1.49540957482637,
      var8: 2.8055429203602,
      var9: 2.8478484444705,
    };*/
    
    this.postData(data).subscribe((response: any) => {
      this.prediccion = response.res.predict[0];
      console.log(this.prediccion);

      console.log(response.res.predict[0]);
    });
    
    

    console.log("Propio       "+this.estandarizarEDI(this.datos))

    var datos2 = this.estandarizarEDI(this.datos)

     const data1 = {
      var0: datos2[0],
      var1: datos2[1],
      var2: datos2[2],
      var3: datos2[3],
      var4: datos2[4],
      var5: datos2[5],
      var6: datos2[6],
      var7: datos2[7],
      var8: datos2[8],
      var9: datos2[9],
    };

    
    this.postData(data1).subscribe((response: any) => {
      this.prediccion2 = response.res.predict[0];
      console.log(this.prediccion2);

      console.log(response.res.predict[0]);
    });

  }





  estandarizarEDI(datos: any) {

    let respuesta = []
    for (var i = 0; i <= datos.length; i++) {
      var z = (this.datos[i] - this.medias[i]) / this.stdDev[i];
      var x = z / Math.sqrt(this.datos[i] ^ 2);
      
      if (x == Infinity || x == -Infinity) {
        let xdecimal = Number(x);
        const fin = xdecimal.toFixed(10);

        //MALA PRACTICA 
       
        respuesta.push(0)
       
      }else{
        respuesta.push(x)
      }
    }
    return respuesta;
  }
/*
  p1(entrada: any) {
    var media = 48.5180995;
    var desv_est = 13.1090278;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }

  p2(entrada: any) {
    var media = 1.4683258;
    var desv_est = 0.4995612;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    if (x == Infinity || x == -Infinity) {
      x = 1 / x;
    }
    console.log('xxx' + x);

    var fin = x.toPrecision(10);
    console.log(fin);
    return fin;
  }

  p3(entrada: any) {
    var media = 26.3757919;
    var desv_est = 4.4181216;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }

  p4(entrada: any) {
    var media = 94.6470136;
    var desv_est = 13.8312834;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }

  p5(entrada: any) {
    var media = 189.1402715;
    var desv_est = 34.6080517;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }

  p6(entrada: any) {
    var media = 115.4391403;
    var desv_est = 30.413081;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }

  p7(entrada: any) {
    var media = 49.7884615;
    var desv_est = 12.9342022;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }

  p8(entrada: any) {
    var media = 4.0702489;
    var desv_est = 1.2904499;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }

  p9(entrada: any) {
    var media = 4.6414109;
    var desv_est = 0.5223906;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }

  p10(entrada: any) {
    var media = 91.260181;
    var desv_est = 11.4963347;

    var z = (entrada - media) / desv_est;
    var x = z / Math.sqrt(entrada ^ 2);

    var fin = x.toFixed(10);
    console.log(fin);
    return fin;
  }
  

*/

   estandarizarChatGPT(data:any) {
    
    let sum = 0;
    // Estandarizar los datos
    let standardizedData = [];
    for (let i = 0; i < data.length; i++) {
      standardizedData.push((data[i] - this.medias[i]) / this.stdDev[i]);
    }
  
    // Normalizar los datos estandarizados
    let normalizedData = [];
    let sumSquared = 0;
    for (let i = 0; i < standardizedData.length; i++) {
      sumSquared += Math.pow(standardizedData[i], 2);
    }
    let norm = Math.sqrt(sumSquared);
    for (let i = 0; i < standardizedData.length; i++) {
      normalizedData.push(standardizedData[i] / norm);
    }
    
    return normalizedData;
  }

 





}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBI4G-dSOBWI1NJagBGiZULvfFH_3v9ZZk',
  authDomain: 'bigdatautn.firebaseapp.com',
  projectId: 'bigdatautn',
  storageBucket: 'bigdatautn.appspot.com',
  messagingSenderId: '619055850770',
  appId: '1:619055850770:web:0b4eedf54530c1da997fcb',
  measurementId: 'G-TBJT4MQ0EN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
