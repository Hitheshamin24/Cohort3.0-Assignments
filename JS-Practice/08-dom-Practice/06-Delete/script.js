let btns=document.querySelectorAll('button')

btns.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        btn.parentElement.remove()
    })
})