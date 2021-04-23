let getSavedTodos=function(){
    let todosJSON=localStorage.getItem('todos')
    if(todosJSON !== null){
        return JSON.parse(todosJSON)
    }else{
        return []
    }
}

let saveTodos=function(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}

let renderTodos=function(todos,filters){
    let filteredtodos=todos.filter(function(i){
        if(!filters.hideCompleted )
          return i.text.toLowerCase().includes(filters.searchText.toLowerCase())
        else{
            if(!i.completed)
            return i.text.toLowerCase().includes(filters.searchText.toLowerCase())
        }
    })
    let incompleteTodos=filteredtodos.filter(function(i){
       return !i.completed
    })
    document.querySelector('#searchresult').innerHTML=''
    document.querySelector('#message').innerHTML=''
    let message=generateSummaryDOM(incompleteTodos.length)
    document.querySelector('#message').appendChild(message)
    if(filteredtodos.length!==0){
    filteredtodos.forEach(function(todo){
        let todoEl=generateTodoDOM(todo)
        document.querySelector('#searchresult').appendChild(todoEl)
    })
    }
    else{
        let paraEl=document.createElement('p')
        paraEl.className='empty-message'
        paraEl.textContent='Nothing to show here'
        document.querySelector('#searchresult').appendChild(paraEl)

    }
}

let generateTodoDOM=function(todo){
    let todoEl=document.createElement('label')
    let checkbox=document.createElement('input')
    let todoText=document.createElement('span')
    let removeButton=document.createElement('button')
    let containerEl=document.createElement('div')
    
    checkbox.type='checkbox'
    checkbox.checked=todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change',function(){
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })

    todoText.textContent=todo.text 
    containerEl.appendChild(todoText)
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    removeButton.textContent='remove'
    removeButton.classList.add('button','button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click',function(){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })



        return todoEl
}

let generateSummaryDOM=function(jobs){
    let message=document.createElement('h2')
    message.className='list-title'
    if(jobs!==1)
       message.textContent=`You have ${jobs} jobs todo`
    else
        message.textContent=`You have 1 job todo`
    return message

}

let removeTodo=function(todoId){
    let index=todos.findIndex(function(i){
        return i.id ===todoId
    })
    if(index !== -1){
        todos.splice(index,1)
    }
}

let toggleTodo=function(id){
    let todo=todos.find(function(todo){
        return todo.id===id
    })
    if(todo!==undefined)
       todo.completed=!todo.completed
}