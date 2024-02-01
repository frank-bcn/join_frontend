import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoverService {

  activeLink: string = '';
  hoverDone: boolean = false;
  hoverTodo: boolean = false;

  constructor() { }
}
