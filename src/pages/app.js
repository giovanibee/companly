import React from "react"
import {
  useEffect,
  useMemo,
  useState,
} from "react"
import anime from "animejs"
import { Box, Grid, Grommet } from "grommet"
import { alphabet, companyList } from "../company-list"
import { SpinnerContainer } from "../components/SpinnerContainer"
import { defaultList, useTitle } from "../hooks"
import "./styles.css"

// https://codesandbox.io/p/sandbox/slot-machine-forked-q7x73w?file=%2Fsrc%2FSlotMachine.jsx%3A20%2C21
export default function App() {
  const [idea, setIdea] = useState(null)
  const { data: { title, companies } = {}, isFetching, isLoading, refetch } = useTitle(idea)

  useEffect(() => {
    const initialHeader = document.getElementById("initial-header")
    anime.timeline({
      endDelay: 1000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    }).add({
      targets: initialHeader,
      duration: 1000,
    })
  
    const companyTitle = document.getElementById("company-title")
    anime({
      easing: "easeInOutSine",
      targets: companyTitle,
      translateY: 20,
    });
  }, [])

  useEffect(() => {
    if (!isFetching || isLoading || title) return
    anime({
      easing: "easeInOutSine",
      targets: document.getElementById("company-title"),
      translateY: 20,
    })
  }, [isFetching, title])

  const onGenerate = async () => {
    const companyAIndex = Math.floor(Math.random() * companyList.length - 1)
    const companyA = companyList[companyAIndex]
    let companyBIndex = Math.floor(Math.random() * companyList.length - 1)
    if (companyBIndex === companyAIndex) {
      companyBIndex++
      if (companyBIndex === companyList.length - 1) companyBIndex--
    }
    const companyB = companyList[companyBIndex]
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
      <Grid
        align="center"
        areas={[
          ["companyTitle", "companyTitle", "companyTitle"],
          ["companyA", "meets", "companyB"],
          ["generateButton", "generateButton", "generateButton"],
        ]}
        columns={["medium", "xxsmall", "medium"]}
        fill
        id='app-grid'
        gap="xxsmall"
        justify="center"
        justifyContent="center"
        pad="small"
        rows={["medium", "xsmall", "xsmall"]}
      >
        <Box gridArea="companyTitle" className="App">
          {header}
          <div className="company-title-row">
            {(Array.isArray(title) ? title : defaultList).map((letter, id) => {
                alphabet.sort(() => Math.random() - 0.5)
                return (
                  <div className='company-title' key={`letter-${id}`}>
                    <div className='letters'>
                      {(isFetching && !isLoading) || !title
                        ? <div className="alphabet-list">
                            {alphabet.map((item, id) => (
                              <div key={`item-${id}`}>
                                {item}
                              </div>
                            ))}
                          </div>
                        : letter}
                    </div>
                  </div>
                )
              })}
          </div>
        </Box>
        <SpinnerContainer
          idea={companies}
          isLoading={isFetching && !isLoading}
        />
        <Box gridArea="generateButton" className="App">
          <button
            id='generate-button'
            disabled={isFetching ?? false}
            onClick={onGenerate}
          >
            Generate
          </button>
        </Box>
      </Grid>
    </Grommet>
  )
}
