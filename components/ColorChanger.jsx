import React from "react";

export default function ColorChanger ({selectedColor,colortext}) {

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
                <li data-color="#000000" data-text={'블랙 색상의 iPhone'} onClick={handleColor} className="w-8 h-8 bg-black rounded-full shadow-2xl shadow-gray-300/30"></li>
                <li data-color="#a39c89" data-text={'내추럴 티타늄 색상의 iPhone'} onClick={handleColor} className="w-8 h-8 bg-[#959086] rounded-full shadow-2xl shadow-gray-300/30"></li>
                <li data-color="#ffffff" data-text={'화이트 색상의 iPhone'} onClick={handleColor} className="w-8 h-8 bg-white rounded-full shadow-2xl shadow-gray-300/30"></li>
                <li data-color="#897361" data-text={'데저트 티타늄 색상의 iPhone'} onClick={handleColor} className="w-8 h-8 bg-[#897361] rounded-full shadow-2xl shadow-gray-300/30"></li>
            </ul>
        </div>
    )
}