import React, { useEffect } from "react"
import anime from "animejs"
import { Box } from "grommet"
import { companyList } from "../company-list"
import "./styles.css"

export const SpinBox = ({
  isLoading = false,
  name = "",
  value = "..."
}) => {
  companyList.sort(() => Math.random() - 0.5)
  useEffect(() => {
    const targets = document.getElementsByClassName('item-thing')
    anime({
      targets,
      loop: true,
      easing: "linear",
      translateY: -1000
    });
  }, [value])
  return (
    <Box
      gridArea={name}
      id={name}
      className={`${isLoading ? 'company-loading' : 'company'}`}
    >
      {isLoading ? (
        <div className='companies-list'>
          {companyList.map((item, id) => (
            <div className="item-thing" key={`item-${id}`}>
              {item}
            </div>
          ))}
        </div>
      ) : (value || "...")}
    </Box>
  );
}
