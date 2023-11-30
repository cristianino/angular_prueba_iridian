import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Contacto } from '../models/contacto';
import { AreaDeContacto } from '../models/area-de-contacto';
import { ContactoService } from '../services/contacto.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  areasDeContacto: AreaDeContacto[] = [];
  contactoForm: FormGroup = this.formBuilder.group({
    nombre: [''],
    apellido: [''],
    correo: [''],
    celular: [''],
    areaDeContacto: [''],
    mensaje: ['']
  });

  constructor(private formBuilder: FormBuilder,
    private contactoService: ContactoService) { }

  ngOnInit(): void {
    this.contactoForm = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      correo: [''],
      celular: [''],
      areaDeContacto: [''],
      mensaje: ['']
    });

    this.cargarAreasDeContacto();
  }

  cargarAreasDeContacto(): void {
    this.contactoService.getAreasDeContacto().subscribe(
      (areas) => {
        this.areasDeContacto = areas;
      },
      (error) => {
        console.error('Error al cargar las áreas de contacto:', error);
      }
    );
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      console.log(this.contactoForm.value);
    }
  }
}
