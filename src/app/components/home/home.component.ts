import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../post-card/post-card.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostCardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Dados mocados diretamente
  myPosts = [
    {
      id: 1,
      title: '💰 Cotação do Dólar Comercial com Python e API do Banco Central',
      author: 'Thayná Quinteiro',
      date: '17 Nov 2025',
      description: 'Nesta atividade, desenvolvi um programa em Python capaz de consultar a cotação do dólar comercial em um período específico, mesmo quando existem dias sem cotação.',
      image: 'Atividade1.png'
    },
    {
      id: 2,
      title: '🚌 Monitoramento de Frota em Tempo Real usando a API Olho Vivo',
      author: 'Thayná Quinteiro',
      date: '17 Nov 2025',
      description: 'Nesta atividade, desenvolvemos um sistema capaz de buscar informações de uma linha de ônibus, listar suas paradas e exibir, em tempo real, a localização dos veículos dessa linha em um mapa interativo.',
      image: 'Atividade2.png'
    },
    {
      id: 3,
      title: '📈 Regressão Linear para prever salários a partir dos anos de estudo',
      author: 'Thayná Quinteiro',
      date: '17 Nov 2025',
      description: 'Nesta atividade, o objetivo é analisar como os anos de estudo influenciam o salário de uma pessoa. Para isso, utilizamos uma Regressão Linear Simples, implementada manualmente em Python.',
      image: 'Atividade_3.png'
    }
  ];
}
