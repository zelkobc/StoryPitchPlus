import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string;
  private formHeaders = this.urlServ.formHeaders;
  private regHeaders = this.urlServ.regHeaders;

  constructor(private http: HttpClient, private urlServ: UrlService) {this.url = urlServ.getUrl() + "posts" }

  ngOnInit(): void {
  }

  addPost(post: Post)
  {
    return this.http.post(this.url,JSON.stringify(post), {headers: this.regHeaders, withCredentials:true});
  }

  getPostById(id: number)
  {
    return this.http.get(this.url + "/" + id);
  }

  getAllPosts()
  {
    return this.http.get(this.url + "/all");
  }

  updatePost(post: Post)
  {
    return this.http.put(this.url, post, {headers: this.regHeaders, withCredentials:true});
  }

  deletePostById(id: number)
  {
    return this.http.delete(this.url + "/" + id);
  }
}