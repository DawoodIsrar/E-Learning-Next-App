"use client";
import { useState } from "react";
import AccordianIcon from "@/assets/icons/AccordianIcon";
import CourseAccordianImage from "@/assets/icons/CourseAccordianImage";
import betterOrganicImage from "@/assets/images/BetterOrganicImage.png";
import Image from "next/image";
import "./style.scss";

const FaqAccordian = ({ accordionHeight, accordionWidth, index }) => {
  const [openTab, setOpenTab] = useState(null);

  const handleTabClick = (clickedIndex) => {
    setOpenTab((prevOpenTab) =>
      prevOpenTab === clickedIndex ? null : clickedIndex
    );
  };

  return (
    <div className="accordion">
      <div className="tab" key={`${index}-1`}>
        <input
          type="checkbox"
          id={`tab${index}-1`}
          className="tab-input"
          checked={openTab === `${index}-1`}
          onChange={() => handleTabClick(`${index}-1`)}
        />
        <label
          htmlFor={`tab${index}-1`}
          className="tab-label"
          style={{ width: accordionWidth === 508 ? "295px" : "auto" }}
        >
          Who is this SEO Course for?
          <div className="accordion-wrapper">
            <AccordianIcon
              className="icon"
              isRotated={openTab === `${index}-2`}
            />
          </div>
        </label>
        <div
          className="tab-content"
          style={{ display: openTab === `${index}-1` ? "block" : "none" }}
        >
          <div className="faq1">
            <Image
              src={CourseAccordianImage}
              alt="better organic"
              width={101}
              height={53}
            />
            <ul>
              <li>Complete beginners in SEO</li>
              <li>Web Engineers who want to learn SEO</li>
              <li>SEO consultants who want to educate their clients</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="tab" key={`${index}-2`}>
        <input
          type="checkbox"
          id={`tab${index}-2`}
          className="tab-input"
          checked={openTab === `${index}-2`}
          onChange={() => handleTabClick(`${index}-2`)}
        />
        <label
          htmlFor={`tab${index}-2`}
          className="tab-label"
          style={{ width: accordionWidth === 508 ? "295px" : "auto" }}
        >
          Introduction to SEO Tutorial for Beginners
          <div className="accordion-wrapper">
            <AccordianIcon
              className="icon"
              isRotated={openTab === `${index}-2`}
            />
          </div>
        </label>
        <div
          className="tab-content"
          style={{ display: openTab === `${index}-2` ? "block" : "none" }}
        >
          <p>
            You can find many learning materials or articles for
            <span>Search Engine Optimization</span> (SEO) online. SEO tool
            software companies, SEO service agencies, or individual blogs often
            provide those learning content.
          </p>
          <p>
            Many articles give good insights into improving your SEO skills, but
            there are many overlaps among them.
          </p>
          <p>
            After reading lots of articles, you might feel confused by the
            overwhelming amount of complex interconnected information.
          </p>
          <p>
            <span>
              You need a proper framework to organize SEO-related knowledge{" "}
            </span>
            to learn SEO efficiently.
          </p>
          <p>
            In this <span>SEO Tutorial for Beginners,</span> we cover basic
            knowledge about SEO comprehensively with a consistent framework.
            Using a consistent framework across the topics helps improve your
            learning efficiency.
          </p>
        </div>
      </div>

      <div className="tab" key={`${index}-3`}>
        <input
          type="checkbox"
          id={`tab${index}-3`}
          className="tab-input"
          checked={openTab === `${index}-3`}
          onChange={() => handleTabClick(`${index}-3`)}
        />
        <label
          htmlFor={`tab${index}-3`}
          className="tab-label"
          style={{ width: accordionWidth === 508 ? "295px" : "auto" }}
        >
          Learn SEO skills with this step-by-step framework
          <div className="accordion-wrapper">
            <AccordianIcon
              className="icon"
              isRotated={openTab === `${index}-2`}
            />
          </div>
        </label>
        <div
          className="tab-content3"
          style={{
            display: openTab === `${index}-3` ? "contents" : "none",
            paddingBlock: "16px",
            paddingInline: "24px",
          }}
        >
          <p>
            SEO can transform your website's visibility and unlock new
            opportunities. This foundational course demystifies search engine
            optimization, providing a clear framework for actionable on-page,
            technical, and off-page strategies.
          </p>
          <p>
            SEO success depends on understanding how different tactics work
            together. Different facets work together to achieve optimal results.
            For example, ensuring unique and relevant page titles (an on-page
            SEO best practice) can be reinforced by implementing proper URL
            structures (a technical SEO approach). Similarly, optimizing image
            file sizes and alt text (on-page SEO) can also involve leveraging
            Content Delivery Networks (a technical SEO tactic) for faster
            loading speeds. Understanding these interconnected approaches
            empowers you to create a holistic SEO strategy.
          </p>
          <div className="tab-3-list">
            <p className="">
              <span>Key Course Outcomes:</span>
            </p>
            <ul>
              <li>
                <p>
                  <span>Strategic SEO implementation:</span> Develop a
                  structured approach to optimize your web presence for
                  increased organic traffic.
                </p>
              </li>
              <li>
                <p>
                  <span>Algorithmic Understanding:</span> Dive into search
                  engine mechanics and ranking factors to inform a successful
                  SEO strategy.
                </p>
              </li>
              <li>
                <p>
                  <span>Data-Driven Decision Making:</span> Learn to analyze key
                  SEO metrics and tools to fine-tune your website and campaigns
                  for maximum impact.
                </p>
              </li>
              <li>
                <p>
                  <span>Expertise & Adaptability:</span> Master foundational SEO
                  principles and cultivate the ability to adapt to the dynamic
                  landscape of search algorithms.
                </p>
              </li>
            </ul>
          </div>

          <p>
            Mastering SEO requires understanding the interconnected nature of
            its different aspects. While on-page, technical, and off-page SEO
            techniques each have distinct focuses, they often overlap and
            complement each other. To build clarity and avoid confusion, our
            course carefully explains how SEO concepts work together, providing
            a well-structured framework for implementation.
          </p>

          <p>
            This "SEO Tutorial for Beginners" consists of four chapters covering
            the four areas of SEO:
          </p>
          <div className="listItem">
            <div className="number">
              <p>1</p>
            </div>
            <div className="title">
              <p>SEO foundation</p>
            </div>
          </div>
          <div className="listItem">
            <div className="number">
              <p>2</p>
            </div>
            <div className="title">
              <p>On-Page SEO</p>
            </div>
          </div>
          <div className="listItem">
            <div className="number">
              <p>3</p>
            </div>
            <div className="title">
              <p> Technical SEO</p>
            </div>
          </div>
          <div className="listItem">
            <div className="number">
              <p>4</p>
            </div>
            <div className="title">
              <p> Off-Page SEO.</p>
            </div>
          </div>
          <Image
            className="image-faq3"
            src={betterOrganicImage}
            alt={"better organic2"}
            width={772}
            height={579}
          />
          <p>
            This foundational tutorial explores core SEO basics. Advanced users
            can still benefit from the structured approach to strengthen their
            expertise.
          </p>
          <p>
            <span>Prerequisites:</span> While no prior SEO knowledge is
            required, basic familiarity with website management and content
            creation is recommended.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordian;
