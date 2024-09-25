// Importér nødvendige biblioteker og stilarter
import { useQuery } from "@tanstack/react-query";
import { getPostPage } from "../../queries/getPostPage";
import { request } from "graphql-request";
import style from "./Section.module.scss";
import React, { useEffect, useState } from "react";



// Funktionel komponent ved navn Section
export function Section() {

    // Brug af useQuery-hook til at hente data fra GraphQL-endepunktet
    const { data, error, isLoading } = useQuery({
        queryKey: ['getPostPage'],
        queryFn: async () => request(`https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnbdd2ck871e01ugc2dlfy7k/master`, getPostPage),
    });


    console.log('Her er data', data);

    // Initialisering af state til at gemme sorteret postdata
    const [sortedPost, setSortedPost] = useState();

    // Effekt-hook, der udløses ved ændring af data. Indstiller sorteret data og anvender standard sortering.
    useEffect(() => {
        if (data) {
            // Gemmer de hentede blogposter i sortedPost-state
            setSortedPost([data.blogPosts]);
            // Anvender default sortering (option '1' - Dato)
            dropDown('1');
        }
    }, [data]);

    // Funktion til håndtering af dropdown-valg og opdatering af sortering
    function dropDown(option) {
        if (option === '1') {
            // Sorterer blogposter efter dato i faldende rækkefølge
            setSortedPost(prevSortedPost => {
                const sortedDates = [...prevSortedPost];
                if (Array.isArray(sortedDates[0])) {
                    sortedDates[0].sort((a, b) => new Date(b.date) - new Date(a.date));
                }
                return sortedDates;
            });
        }
        if (option === '2') {
            // Sorterer blogposter efter titel i stigende rækkefølge
            setSortedPost(prevSortedPost => {
                const sortedTitles = [...prevSortedPost];
                if (Array.isArray(sortedTitles[0])) {
                    sortedTitles[0].sort((a, b) => a.title.localeCompare(b.title));
                }
                return sortedTitles;
            });
        }
    }

    // Render komponenten
    return (
        <section>
            {isLoading ? (
            <>

                <p>Indlæser...</p>
                </>
                ) : error ? (
                    // Viser fejlbesked ved fejl
                    <p>Fejl: {error.message}</p>
            ) : (
                <div className={style.styleContainer}>

                    {/* Dropdown-menu til valg af sorteringsmulighed */}
                    <div >
                        <select  onChange={(event) => dropDown(event.target.value)}>
                            <option value="1">Dato</option>
                            <option value="2">Titel</option>
                        </select>
                    </div>

                    {/* Visning af sorteret postdata */}

                    <div className={style.gridContainer}>
                        {sortedPost && sortedPost[0].map((post, index) => (
                            <div className={style.StyleDiv} key={index}>
                                <h3>{post.title}</h3>
                                <p>{post.date}</p>

                                <div className={style.ArticleStyle}>
                                    {/* Visning af billede, hvis tilgængeligt */}
                                    <figure>{post.image && <img src={post.image.url} alt={post.image.fileName} />}</figure>
                                    {/* Visning af HTML-indhold for blogtekst */}
                                    <div dangerouslySetInnerHTML={{ __html: post.blogText.html }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
