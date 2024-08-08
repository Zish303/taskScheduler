import { Component, ElementRef, ViewChild } from '@angular/core';
import { TodoService } from '../../todo.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  constructor(private todoService: TodoService, private router: Router) {}
  taskData?: any;
  checkbox?: boolean;
  isSubmitted: boolean = false;
  async ngOnInit() {
    this.todoService.getTodo().subscribe(
      (val) => {
        this.taskData = val;
        // if (this.taskData.status != 200) this.router.navigate(['/login']);
        this.taskData = this.taskData.data;
        console.log(this.taskData);
      },
      (err) => {
        if (err.status == 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  @ViewChild('textarea') textarea!: ElementRef;

  ngAfterViewChecked() {
    this.resizeTextarea();
  }

  onDelete(id: number) {
    this.todoService.deleteTodo(id).subscribe((val) => {
      this.taskData = val;
      this.taskData = this.taskData.data;
    });
  }

  form = new FormGroup({
    description: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  checkInvalidDescription() {
    return this.form.invalid && this.isSubmitted;
  }

  onAddTask() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.todoService.addTodo(this.form).subscribe((val) => {
      this.taskData = val;
      this.taskData = this.taskData.data;
    });
    this.form.reset();
    this.isSubmitted = false;
  }

  resizeTextarea() {
    const textarea = this.textarea.nativeElement;
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
