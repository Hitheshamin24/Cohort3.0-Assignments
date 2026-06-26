let h1=document.querySelector('h1')
let increment=document.querySelector('#increment')
let decrement=document.querySelector('#decrement')

let count=0
increment.addEventListener('click',()=>{
    h1.innerHTML=++count
})
decrement.addEventListener('click',()=>{
    if(count<=0) return
    count--
    h1.innerHTML=count
})