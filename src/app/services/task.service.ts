import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  clickUrgent = true;
  clickMedium = true;
  clickLow = true;
  

  constructor() { }
}