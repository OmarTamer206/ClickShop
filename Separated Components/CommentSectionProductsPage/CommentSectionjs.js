const allStar1= document.querySelectorAll(".Rating1 .star");

allStar1.forEach((item , idx) => 
{
   item.addEventListener("click", function() 
   {
     allStar1.forEach(i=>
        {
            i.classList.replace("bxs-star" , "bx-star")

        });
      for(let i=0 ; i < allStar1.length; i++) 
      {
        if (i <= idx) {
            allStar1[i].classList.replace("bx-star" , "bxs-star");
        }
      }
   });
});

const allStar2= document.querySelectorAll(".Rating2 .star");

allStar2.forEach((item , idx) => 
{
   item.addEventListener("click", function() 
   {
     allStar2.forEach(i=>
        {
            i.classList.replace("bxs-star" , "bx-star")

        });
      for(let i=0 ; i < allStar2.length; i++) 
      {
        if (i <= idx) {
            allStar2[i].classList.replace("bx-star" , "bxs-star");
        }
      }
   });
});

const allStar3= document.querySelectorAll(".Rating3 .star");

allStar3.forEach((item , idx) => 
{
   item.addEventListener("click", function() 
   {
     allStar3.forEach(i=>
        {
            i.classList.replace("bxs-star" , "bx-star")

        });
      for(let i=0 ; i < allStar3.length; i++) 
      {
        if (i <= idx) {
            allStar3[i].classList.replace("bx-star" , "bxs-star");
        }
      }
   });
});