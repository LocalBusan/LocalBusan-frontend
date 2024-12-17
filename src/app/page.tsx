"use client";

import { Logo } from "@/components/ui/logo";
import Link  from "next/link";
import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";



const regionTextArray = [
  '강서구','북구','동구','서구','남구','사하구',
  '해운대구','금정구','동래구','중구','수영구',
  '기장군','부산진구','연제구','사상구'
  ].sort()
  
regionTextArray.unshift('전체');  


export default function Home() {
  const requestArticles = async () => {
    const response = await fetch('http://3.34.225.212:8080/api/boards', {
      method : 'GET'
    });
    const fetchedJson = await (response.json());
    setArticleState(fetchedJson);
  }
  const [articleState, setArticleState] = useState([]); 
  const [regionState, setRegionState] = useState(
    regionTextArray.map((regionName,index)=>{
    return {
      name : regionName,      value : index,
      isSelected : index === 0 ? true : false
    }
  })); 
  const [categoryState, setCategoryState] = useState([{name :'맛집', emoji : '🍔'},{name : '문화', emoji : '🎫'},{name : '피플', emoji:'💬'}].map(
    ({name,emoji},index) => {
      return {
        name,
        emoji,
        value : index+1,
        isSelected : false
      }
    }
  ));
  const onCategorySelectClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    const nextCategoryState = categoryState.map(
      ({value,isSelected,...rest}) => {
        if (parseInt(e.currentTarget.value) === value) {
          return {isSelected : !isSelected, value : value, ...rest}
        }
          return {isSelected : isSelected, value : value, ...rest}
      }
    )
    setCategoryState(nextCategoryState);
  }
  const onRegionSelectClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    let isAll = regionState[0].isSelected;
    const nextRegionState = regionState.map(
      ({value,isSelected,...rest}) => {
        if (parseInt(e.currentTarget.value) === value) {
          isAll = value === 0  ? !isAll : false;
          return {isSelected : !isSelected, value : value, ...rest}
        }
        if (parseInt(e.currentTarget.value) > 0 && isAll) {
          return {isSelected : false, value : value, ...rest}
        }
        return {isSelected : isSelected && !isAll, value : value, ...rest}
      }
    )
    if (!isAll) {
      nextRegionState[0].isSelected = false;
    }
    setRegionState(nextRegionState);
  }
  const selectCheck = (articleData : any) => {
    let categoryCheck = false;
    let regionCheck = false;
    if (!categoryState[0].isSelected && !categoryState[1].isSelected && !categoryState[2].isSelected) {
      categoryCheck = true;
    }
    if (regionState[0].isSelected) {
      regionCheck = true;
    }
    for (const category of categoryState) {
      if (categoryCheck) break;
      if (articleData.category.category_id === category.value && category.isSelected) {
        categoryCheck = true;
        break;
      } 
    }
    for (const region of regionState) {
      if (articleData.region.region_id === region.value && region.isSelected) {
        regionCheck = true;
        break;
      } 
    }
    return regionCheck && categoryCheck;
  }
  useEffect(()=>{
    requestArticles(); 
  },[])
  return (
    <>
    <div className="flex justify-end gap-x-3 h-10 px-8 items-center">
        {true ? <Link href="/login">로그인</Link> : <Link href="/login">로그아웃</Link> }
        <Link href="/signup">회원가입</Link>
    </div>
    <div className="flex flex-col justify-center gap-y-10 items-center">
      <div className="flex flex-col items-center">
        <Logo/>
      </div>
      <div className="flex justify-center gap-x-12">
      {
        categoryState.map(({name,isSelected,value,emoji})=>{
          if (isSelected) {
            return (
              <button key={value} value={value} onClick={onCategorySelectClick}className="border-2 border-black rounded-md px-6 py-2 hover:cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl">{emoji}</div>
                  <span className="text-2xl text-black font-bold">{name}</span>
                </div>   
              </button>
            );
          }
          return (
            <button key={value} value={value} onClick={onCategorySelectClick} className="border-2 border-gray-300 rounded-md px-6 py-2 hover:cursor-pointer">
              <div className="text-center">
                <div className="text-4xl">{emoji}</div>
                  <span className="text-2xl text-gray-400 font-medium">{name}</span>
              </div>   
            </button>
          ); 
        })
      }
      </div>
      <div className="flex w-[400px] gap-2 flex-wrap justify-center">
          {
            regionState.map(({name,value,isSelected})=>{
              if (isSelected) {
                return <button key={value} value={value} onClick={onRegionSelectClick} className="bg-black text-white w-[70px] h-[25px] text-center font-semibold rounded-xl py-0.5  hover:cursor-pointer">{name}</button>;
              }
              return <button key={value} value={value} onClick={onRegionSelectClick} className="bg-gray-300 text-gray-500 w-[70px] h-[25px] text-center font-semibold rounded-xl py-0.5 hover:cursor-pointer">{name}</button>;
            })
          }
      </div>
    <div className="flex justify-center gap-10 w-[1000px] flex-wrap">
      {
        articleState.filter(selectCheck).map(({region,category,created_at,article_id, title ,subtitle, thumbnail_url} : any,index)=>{
          return(
          <Link key={index} href={`/article/${article_id}`} className="w-[300px] flex flex-col">
              <AspectRatio ratio={16 / 9}>
                  <img src={thumbnail_url} alt="Image" className="rounded-md object-cover" onError={({currentTarget})=>{currentTarget.src = './alt_image.png'}}/>
              </AspectRatio>
              <div className="text-amber-800 font-bold">{category.category_name} in {region.region_name}</div>
              <h1 className="text-2xl font-bold" >{title}</h1>
              <h2 className="text-md text-gray-500">{subtitle}</h2>
              <h3 className="text-sm text-black">{created_at}</h3>
          </Link>)})
      }
    </div>
    </div>
    </>
  );
}
