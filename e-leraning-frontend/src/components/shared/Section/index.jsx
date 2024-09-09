import "./style.scss";

const Section = ({
  sectionClasses = "",
  widthHandlerDivClasses = "",
  children,
  widthHandlerDivInlineStyling = {},
  bgcolor = "",
}) => {
  return (
    <section className={`flex_col ${sectionClasses}`}>
      <div style={{ backgroundColor: `${bgcolor}` }}>
        <div
          className={`width_handle_basic ${widthHandlerDivClasses}`}
          style={{ ...widthHandlerDivInlineStyling }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
