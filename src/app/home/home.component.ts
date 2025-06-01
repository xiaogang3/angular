import { Component,OnInit,OnDestroy,AfterViewInit, ElementRef, ViewChild,HostListener} from '@angular/core';
import { map } from 'rxjs';
import * as THREE from 'three'

import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {


  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
 
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private loader: GLTFLoader;
  constructor(){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.loader = new GLTFLoader();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }
 
  ngOnInit() {
 
  }
 
  ngAfterViewInit() {
    this.initRenderer();
    this.loadModel();
    this.animate();
  }
 

 
  private initRenderer(): void {
    this.renderer.setSize(
      this.rendererContainer.nativeElement.clientWidth,
      this.rendererContainer.nativeElement.clientHeight
    );
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }
 
  private loadModel(): void {
    // this.loader.load(
    //   'assets/cartoon_style_dog_wolf_brown_fur_white_markings_gltf/scene.gltf', // Note the corrected path (no '../../')
    //   (gltf) => {
    //     this.scene.add(gltf.scene);
    //   },
    //   undefined,
    //   (error) => {
    //     console.error('Error loading model:', error);
    //   }
    // );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add(cube);
  }
 
  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
