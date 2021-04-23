let todos=getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted:false
}

renderTodos(todos,filters)

document.querySelector('#search').addEventListener('input',function(e){
       filters.searchText=e.target.value
       renderTodos(todos,filters)
})

document.querySelector('#new-todo').addEventListener('submit',function(e){
   e.preventDefault()
   let val=e.target.elements.todoInput.value.trim()
   if(val!==''){
    e.target.elements.todoInput.value=''
    todos.push({
        id: uuidv4(),
        text : val,
        completed :false
    })
    saveTodos(todos)
    renderTodos(todos,filters)
   }

})

document.querySelector('#hideCompleted').addEventListener('change',function(e){
     filters.hideCompleted=e.target.checked
     renderTodos(todos,filters)

})






















// todos.forEach(function(i){
//     let temp=document.createElement('p')
//     temp.textContent=i.text
//     document.querySelector('#todo').appendChild(temp)
// })

// document.querySelector('#addnote').addEventListener('input',function(e){
//     console.log(e.target.value)
// })