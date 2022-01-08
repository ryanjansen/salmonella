from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from manim import *

function = lambda x: x * x + 5

class FunctionPlotIntegration(Scene):
    def setup(self):
        global function
        self.function = function

    def construct(self):
        axes = Axes(
            x_range=[-10, 10.3, 1],
            y_range=[-1.5, 1.5, 1],
            x_length=10,
            axis_config={"color": GREEN},
            x_axis_config={
                "numbers_to_include": np.arange(-10, 10.01, 2),
                "numbers_with_elongated_ticks": np.arange(-10, 10.01, 2),
            },
            tips=False,
        )
  
        cos_graph = axes.plot(lambda x: np.fromfunction(self.function, (10, )), color=RED)

        cos_label = axes.get_graph_label(cos_graph, label="\\cos(x)")

        rects = axes.get_riemann_rectangles(
            cos_graph,
            x_range=[-10, 10],
            dx=0.2,
            color=(TEAL, BLUE_B, DARK_BLUE),
            input_sample_type="center",
        )

        # plot = VGroup(axes, cos_graph)
        # labels = VGroup(axes_labels, cos_label)
        
        self.play(Create(axes), Create(cos_graph), Write(cos_label))
        self.play(Create(rects))
        # self.add(plot, labels, animate=True)

class FunctionPlotDifferentiation(Scene):

    def construct(self):

        axes = Axes(  x_range=[-10, 10.3, 1],
            y_range=[-1.5, 1.5, 1],
            x_length=10,
            axis_config={"color": GREEN},
            x_axis_config={
                "numbers_to_include": np.arange(-10, 10.01, 2),
                "numbers_with_elongated_ticks": np.arange(-10, 10.01, 2),
            },
            tips=False,)

        s_shape_graph = axes.plot(lambda x: np.cos(x), color=BLUE)

        self.play(FadeIn(axes))
        self.play(Create(s_shape_graph))

        self.wait()

        alpha = ValueTracker(0.0)  

        draw_tangent = (lambda: 
            TangentLine(s_shape_graph, alpha.get_value(), 5, color=YELLOW))


        # always redraw the tangent line, i.e. update when alpha changes
        tangent = always_redraw(draw_tangent)  

        self.play(Create(tangent))

        # move the value of alpha around
        for alpha_ in (0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1):
            self.play(alpha.animate.set_value(alpha_))

        self.wait()

app = FastAPI()

app.mount("/static",  StaticFiles(directory="static"), name="static")

@app.get("/integrate")
async def integrate():
  scene = FunctionPlotDifferentiation()
  scene.render()
  return { "src": "http://localhost:8000/static/videos/scene/480p15/CreateCircle.mp4"}