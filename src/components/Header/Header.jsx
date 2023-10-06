import { useQuery } from "@tanstack/react-query"
import { request } from "graphql-request";
import { getHeaderImage } from '../../queries/getHeaderImage';
import style from './Header.module.scss'
import { useState } from "react";





export function Header() {
   const {data,error,isLoading} = useQuery({
    queryKey: ['getHeaderImage'],
    queryFn: async () => request(
        `https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnbdd2ck871e01ugc2dlfy7k/master`,
        getHeaderImage),
   });

    // console.log(data);


  return (
    <section className={style.HeaderStyle}>
      
    <h1>The Cats Gallery</h1>
    {isLoading ? (<p>Loading...</p>) : error ? (
      <p>Error: {error.message}</p>
    ) : (
      <div>{data && <img src={data.asset?.url} alt="Header Image" />}</div>
    )}

   
  </section>
  );

  
}