import Realtime from "../assets/realtime.gif";



const Discover = () => {
    return(
        <>
        <div className="container py-5">
      <h2 className=" text-center fw-bold m-5 ">
        Discover how <span className="text-primary">MockTalk.AI</span> makes interview preparation <br /> faster, smarter, and stress-free.
      </h2>

      <div className="row align-items-center mt-5">
        {/* Text Features */}
        <div className="col-lg-7" style={{marginTop:'5%'}}>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className="bi bi-bar-chart-fill fs-2 text-primary"></i>
                </div>
                <div>
                  <h5 className="fw-bold">AI-Powered Feedback</h5>
                  <p>
                    MockTalk.AI uses advanced AI to analyze your responses and give instant, actionable feedback to boost your performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className="bi bi-chat-square-quote-fill fs-2 text-danger"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Real-Time Questioning</h5>
                  <p>
                    Practice with live, voice-enabled interview questions that simulate real interviewer interactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className="bi bi-sliders2-vertical fs-2 text-success"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Custom Practice Sessions</h5>
                  <p>
                    Tailor your mock interviews based on job role, difficulty, or topic to stay focused and efficient.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className="bi bi-pie-chart-fill fs-2 text-info"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Clear Progress Reports</h5>
                  <p>
                    Get detailed performance analytics with easy-to-read visuals to track growth and readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="col-lg-5 text-center mt-3">
          <img
            src={Realtime} // Change this path to your image
            alt="UX Planning"
            className="img-fluid"
            style={{ maxWidth: '85%', height: 'auto' }}
          />
        </div>
      </div>
    </div>

        </>
    )
}
export default Discover;