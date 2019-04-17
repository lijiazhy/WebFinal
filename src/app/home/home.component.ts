import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showTable1: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  
  toGame(){
    this.router.navigate(['game']);
  }
  
  showPic1(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>Enjoy the power to create and control people in a virtual world where there are no rules.Express your creativity as you customize your Sims’ appearances and personalities, and build them the perfect homes. Develop your Sims’ relationships, pursue careers, and explore vibrant new worlds.</p><img src="../../assets/images/thesims4.png" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic2(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>The Monster Hunter (モンスターハンター Monsutā Hantā) franchise is a series of fantasy-themed action role-playing video games that started with the game Monster Hunter for PlayStation 2, released in 2004. Titles have been released across a variety of platforms, including personal computer, home console, portable consoles, and mobile devices. The series is developed and published by Capcom.</p><img src="../../assets/images/monsterhunter1.jpg" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic3(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>For the first time in the series, there are two main protagonists: Kratos, the former Greek God of War who remains as the only playable character, and his young son Atreus; at times, the player may passively control him. Following the death of Kratos" second wife and Atreus" mother, they journey to fulfill her promise to spread her ashes at the highest peak of the nine realms. Kratos keeps his troubled past a secret from Atreus, who is unaware of his divine nature. Along their journey, they encounter monsters and gods of the Norse world.</p><img src="../../assets/images/godofwar1.png" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic4(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>The player controls Leon S Kennedy and Claire Redfield, who must escape Raccoon City after its citizens are transformed into zombies by a biological weapon two months after the events of the original Resident Evil. The gameplay focuses on exploration, puzzles, and combat; the main difference from its predecessor are the branching paths, with each player character having unique storylines and obstacles.</p><img src="../../assets/images/resident1.png" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic5(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>The gameplay will feature the return of Dante and Nero as playable characters, along with a new character,named "V".The gameplay is similar to the other titles in the Devil May Cry series, focusing on fast-paced "stylish action". The player fights off hordes of demons with a variety of attacks and weapons and receives a style-rating in combat based on a number of factors, such as move variety, the length of a combo and dodging attacks. The music in the game will change based on the player"s performance in combat."</p><img src="../../assets/images/devil1.jpg" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic6(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML="<p>Dota 2 is played in matches between two teams of five players, with each team occupying and defending their own separate base on the map. Each of the ten players independently controls a powerful character, known as a 'hero', who all have unique abilities and differing styles of play. During a match, players collect experience points and items for their heroes to successfully defeat the opposing team's heroes in player versus player combat. A team wins by being the first to destroy a large structure located in the opposing team's base, called the 'Ancient'.</p><img src='../../assets/images/dota1.jpg' height='200px' width='350px'>";
    el.style.background = "black";
  }
  showPic21(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>Human: Fall Flat is a quirky open-ended physics-based puzzle platformer set in floating dreamscapes. Your goal is to find the exit of these surreal levels by solving puzzles with nothing but your wits. Local co-op for 2 players and up to 8 online for even more mayhem!</p><img src="../../assets/images/humanfallflat2.jpg" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic22(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>Together with old pals and new comrades alike, Jesse embarks on a brand new journey filled with tough choices, good times, and at least one temperamental llama.</p><img src="../../assets/images/minecraft2.jpg" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic23(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>"Gu Jian Qi Tan San: Meng Fu Qian Qiu Xing Ye" is a large 3D stand-alone role-playing game independently developed by Shanghai Chanlong, a subsidiary of Net Tang. This generation of works further expands the ancient sword world view, depicting the vast mountains and rivers in a realistic and beautiful style, and bringing the long-term humanity to the world with a new picture, bringing players closer to the real game world experience!</p><img src="../../assets/images/gujian32.jpg" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic24(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>The Elder Scrolls V: Skyrim is an action role-playing game, playable from either a first or third-person perspective. The player may freely roam over the land of Skyrim which is an open world environment consisting of wilderness expanses, dungeons, cities, towns, fortresses, and villages.</p><img src="../../assets/images/theelderscrolls2.jpg" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic25(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>The Binding of Isaac: Rebirth is a randomly generated action RPG shooter with heavy Rogue-like elements. Following Isaac on his journey players will find bizarre treasures that change Isaac’s form giving him super human abilities and enabling him to fight off droves of mysterious creatures, discover secrets and fight his way to safety.</p><img src="../../assets/images/bindingsaac2.jpg" height="200px" width="350px">';
    el.style.background = "black";
  }
  showPic26(pic: any){
    const el: HTMLElement = document.getElementById('1');
    el.innerHTML='<p>NBA 2K celebrates 20 years of redefining what sports gaming can be. NBA 2K19 continues to push limits as it brings gaming one step closer to real-life basketball excitement and culture</p><img src="../../assets/images/NBA2K192.jpg" height="200px" width="350px">';
    el.style.background = "black";
  }
  toggleTable(){
    if(this.showTable1 == true){
      this.showTable1 = false;
    }else{
      this.showTable1 = true;
    }
  }
  toTable1(){
    if(this.showTable1 == false){
      this.showTable1 = true;
    }
  }
  toTable2(){
    if(this.showTable1 == true){
      this.showTable1 = false;
    }
  }
}
