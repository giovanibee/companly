import React from "react"
import {
  useEffect,
  useMemo,
  useState,
} from "react"
import anime from "animejs"
import { Button, Grommet, Skeleton } from "grommet"
import { companyList } from "../company-list"
import { SpinnerContainer } from "../components/SpinnerContainer"
import { useTitle } from "../hooks"
import "./styles.css"

// https://codesandbox.io/p/sandbox/slot-machine-forked-q7x73w?file=%2Fsrc%2FSlotMachine.jsx%3A20%2C21
export default function App() {
  const [idea, setIdea] = useState(null)
  const { data: title, isFetching, refetch } = useTitle(idea)

  useEffect(() => {
    anime({
      color: "blue",
      easing: "linear",
      targets: document.getElementById("company-title"),
      translateY: 140,
    });
  }, [])

  const onGenerate = async () => {
    const companyAIndex = Math.floor(Math.random() * companyList.length - 1)
    const companyA = companyList[companyAIndex]
    let companyBIndex = Math.floor(Math.random() * companyList.length - 1)
    if (companyBIndex === companyAIndex) {
      companyBIndex++
      if (companyBIndex === companyList.length - 1) companyBIndex--
    }
    const companyB = companyList[companyBIndex]
    const tuple = [companyA, companyB]
    refetch()
    setIdea({ companyA, companyB });
  };

  const header = useMemo(() => {
    if (!idea) {
      return (
        <h1 id="initial-header">
          Random startup idea generator
        </h1>
      );
    }

    return isFetching
      ? <h1 id="loading-header">
          Drumroll please...
        </h1>
      : <h1 id="default-header">
          Congrats! Here&apos;s your startup
        </h1>
  }, [idea, isFetching])

  return (
    <Grommet>
      <div className="App">
        {header}
        <h1 id="company-title">
          {(isFetching)
            ? <Skeleton
                height="45px"
                margin="auto"
                width="medium"
               />
            : title ?? "Companly"}
        </h1>
        <SpinnerContainer idea={idea} isLoading={isFetching} />
        <Button
          disabled={isFetching ?? false}
          label="Generate!"
          onClick={onGenerate}
          primary
        />
      </div>
    </Grommet>
  )
}
