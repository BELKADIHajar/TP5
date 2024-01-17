import { Component } from '@angular/core';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    DashboardComponent,
    RouterOutlet,
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any> =[
    {title :"Home", "route":"/home", icon : "house"},
    {title :"Products", "route":"/products", icon : "search"},
    {title :"New Product", "route":"/newProduct", icon : "safe"},
    {title :"Edit Product", "route":"/editproduct", icon : "safe"}
  ];
  currentAction : any;

  constructor(public appState : AppStateService) {
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }


}
