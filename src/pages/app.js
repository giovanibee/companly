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
  const { data: { title, companies } = {}, isIdle, isLoading: isSpinning, mutateAsync: getTitle } = useTitle()

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

  const animateSparkle = el => {
    const delay = anime.random(0, 200)
    
    anime({
      targets: el,
      translateX: {
        value: anime.random(-320, 320),
        easing: 'easeOutCubic',
      },
      opacity: {
        value: 0,
        easing: 'easeInCubic',
      },
      translateY: [
        {
          value: anime.random(-100, -300),
          easing: 'easeOutCubic',
          duration: anime.random(200, 300),
        },
        {
          value: 600,
          easing: 'easeInCubic',
        }
      ],
      scale: () => anime.random(0.75, 2),
      rotate: () => anime.random(-270, 270),
      delay,
      duration: anime.random(1500, 2000),
      easing: 'easeOutCubic',
      begin: () => setTimeout(() => el.classList.add('visible'), delay),
      complete: () => {el.remove()}
    });
  }

  const confettify = (el) => {
    const sparkleCount = anime.random(8,16)
    const { left, top } = el.style

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("i")
      sparkle.classList.add("sparkle")
      sparkle.style.left = left + anime.random(-15,15) + 'px'
      sparkle.style.top = top + anime.random(0,-30) + 'px'
      sparkle.dataset.rand = anime.random(1,16)
      el.append(sparkle)
      animateSparkle(sparkle)
    }
  }

  useEffect(() => {
    if (!isSpinning) {
      // cue confetti\
      const defaultHeader = document.getElementById('default-header')
      defaultHeader && confettify(defaultHeader)
      return;
    }
    anime({
      targets: '.alphabet-list',
      loop: true,
      easing: "linear",
      translateY: -1000
    });

  }, [isSpinning])

  const onGenerate = async () => {
    const companyAIndex = Math.floor(Math.random() * companyList.length - 1)
    const companyA = companyList[companyAIndex]
    let companyBIndex = Math.floor(Math.random() * companyList.length - 1)
    if (companyBIndex === companyAIndex) {
      companyBIndex++
      if (companyBIndex === companyList.length - 1) companyBIndex--
    }
    const companyB = companyList[companyBIndex]
    await getTitle({ companyA, companyB })
  };

  const header = useMemo(() => {
    if (isIdle) {
      return (
        <h1 id="initial-header">
          Random startup idea generator
        </h1>
      );
    }

    return isSpinning
      ? <h1 id="loading-header">
          Drumroll please...
        </h1>
      : <h1 id="default-header">
          Congrats! Here&apos;s your startup
        </h1>
  }, [isIdle, isSpinning])

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
                      {isSpinning
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
          isLoading={isSpinning}
        />
        <Box gridArea="generateButton" className="App">
          <button
            id='generate-button'
            disabled={isSpinning}
            onClick={onGenerate}
          >
            Generate
          </button>
        </Box>
      </Grid>
    </Grommet>
  )
}
