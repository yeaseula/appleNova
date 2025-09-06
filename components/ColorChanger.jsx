import React from "react";

export default function ColorChanger ({selectedColor,colortext,product}) {
    const ColorChart = {
        iphone: [
            {
                datacolor:'#000000',
                datatext:'블랙 색상의 iPhone',
                realcolor:'#000000',
                default:false
            },
            {
                datacolor:'#a39c89',
                datatext:'내추럴 티타늄 색상의 iPhone',
                realcolor:'#959086',
                default:true
            },
            {
                datacolor:'#ffffff',
                datatext:'화이트 색상의 iPhone',
                realcolor:'#ffffff',
                default:false
            },
            {
                datacolor:'#897361',
                datatext:'데저트 티타늄 색상의 iPhone',
                realcolor:'#897361',
                default:false
            },
        ],
    }

    const targetProduct = ColorChart[product]
    //console.log(targetProduct)

    const handleColor = (e) => {
        const targetColor = e.currentTarget.dataset.color;
        const targetText = e.currentTarget.dataset.text;
        selectedColor(targetColor)
        colortext(targetText)
        const ul = document.querySelectorAll('ul li')
        ul.forEach((ele,idx)=>{
            if(ele.classList.contains('border-2','border-purple-300')) {
                ele.classList.remove('border-2','border-purple-300')
            }
        })
        e.currentTarget.classList.add('border-2','border-purple-300')
    }

    return (
        <div className="fixed bottom-15 left-[50%] translate-x-[-50%] z-999">
            <ul className="flex justify-center gap-3 rounded-full bg-gray-400 pr-4 pl-4 pt-1.5 pb-1.5">
                {targetProduct.map((ele)=>(
                    <li data-color={ele.datacolor} data-text={ele.datatext} onClick={handleColor} className={`w-8 h-8 bg-[${ele.realcolor}] rounded-full shadow-2xl shadow-gray-300/30 ${ele.default ? 'border-2 border-purple-300' : ""}`}></li>
                ))}
            </ul>
        </div>
    )
}