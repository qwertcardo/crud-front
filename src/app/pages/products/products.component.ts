import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faPlusCircle , faPencilAlt, faTrashAlt, faDollarSign, faUndoAlt} from '@fortawesome/free-solid-svg-icons'
import { ProductService } from 'src/app/services/product.service';
import { Product, ProductSell } from 'src/app/model/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faDollarSign = faDollarSign;
  faUndoAlt = faUndoAlt;

  public onCreate: boolean = false;
  public onEdit: boolean = false;
  public onDelete: boolean = false;
  public onSell: boolean = false;

  public products: Product[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private userService: UserService) { }

  public productForm = this.buildCreationForm();

  public editForm = this.buildEditionForm();

  public sellForm = this.buildSellForm();

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.userService.getUsersProducts(this.userService.getUserId()).subscribe(
      resp => this.products = resp as Product[],
      err => console.log(err)
    );
  }

  create() {
    this.onCreate = !this.onCreate;
    this.onSell = false;
    this.onEdit = false;
    this.onDelete = false;
  }

  edit(product: Product) {
    this.onEdit = true;
    this.onSell = false;
    this.onCreate = false;
    this.onDelete = false;
    this.editForm.patchValue(product);
  }

  delete() {
    this.onDelete = true;
    this.onSell = false;
    this.onCreate = false;
    this.onEdit = false;
  }

  sell(product: Product) {
    this.onSell = true;
    this.onDelete = false;
    this.onCreate = false;
    this.onEdit = false;
    this.sellForm.patchValue(product);
  }

  save(form: number) {
    if(form == 1){
      this.productService.save(this.userService.getUserId(), this.productForm.value as Product).subscribe(
        () => {
          this.productForm = this.buildCreationForm();
          this.getProducts();
          this.onCreate = false;
        }, err => console.log(err)
      );
    }
    if(form == 2) {
      this.productService.update(this.editForm.value as Product).subscribe(
        () => {
          this.editForm = this.buildEditionForm();
          this.getProducts();
          this.onEdit = false;
        }, err => console.log(err)
      );
    }
    if(form == 3) {
      const productSell = { 
        userId: this.userService.getUserId(),
        amount: this.sellForm.value.amount} as ProductSell;
      this.productService.sell(this.sellForm.value.id, productSell).subscribe(
        () => {
          this.sellForm = this.buildSellForm();
          this.getProducts();
          this.onSell = false;
        }, err => console.log(err)
      );
    }
  }

  confirmDelete(productId: number) {
    this.productService.delete(productId).subscribe(
      () => {
        this.onDelete = false;
        this.getProducts();
      }, err => console.log(err)
    );
  }

  cancel(form: number) {
    if(form == 1) {
      this.productForm = this.buildCreationForm();
      this.onCreate = false;
    }
    if(form == 2) {
      this.editForm = this.buildEditionForm();
      this.onEdit = false;
    }
    if(form == 3) {
      this.sellForm = this.buildSellForm();
      this.onSell = false;
    }
    if(form == 4) {
      this.onDelete = false;
    }
  }

  buildCreationForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      inStock: [0, Validators.required]
    });
  }

  buildEditionForm() {
    return this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      inStock: [0, Validators.required]
    });
  }

  buildSellForm() {
    return this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: [0, Validators.required],
      amount: [0, Validators.required],
      inStock: [0, Validators.required]
    });
  }
}
