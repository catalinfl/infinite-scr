import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ToDo from "./ToDo";

export type ToDoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  innerRef?: React.Ref<HTMLParagraphElement>;
}


function App() {


  const fetchData = async ({ pageParam }: { pageParam: number}) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`);
    return response.json();
  }

  const { inView, ref } = useInView(); 

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    }
  })

  console.log(isFetchingNextPage)


  useEffect(() => {

    setTimeout(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, 2000)
  }, [inView, hasNextPage, isFetchingNextPage])

  console.log(data)




  return (
    <>
      { data?.pages?.map((page) => {
        return page?.map((todo: ToDoType, index: number) => {
          if (index === page.length - 1) {

            return <ToDo key={todo.id} {...todo} innerRef={ref} />
          }
          
          console.log(todo)
          return <ToDo key={todo.id} {...todo} />
        })
      })}
      {inView ? <p>Loading...</p> : null}
    </>
  )

}


export default App