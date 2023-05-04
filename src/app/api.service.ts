import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, } from '@supabase/supabase-js';

import { environment } from 'src/environments/environment.prod';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.key);
   }

  async addTodo(todo: Todo) {
    const { data, error } = await 
      this.supabase.from('todosDefault')
      .insert(todo)
      return {data, error };
  }

  async getTodos() {
    let { data: todos, error } = await this.supabase
      .from('todosDefault')
      .select('*')
      .limit(10)
    return { todos, error };
  }

  async deleteTodo(id: string) {
    const data = await this.supabase
      .from('todosDefault')
      .delete()
      .match( {id: id })
    return data;
  }

  async update(todo: Todo) {
    const { data, error } = await this.supabase
      .from('todosDefault')
      .update('todosDefault')
      .match({ id: todo.id });
  }
}
