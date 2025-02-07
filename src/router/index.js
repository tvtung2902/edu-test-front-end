import { LayoutDefault } from "../layout/default";
import Home from "../page/Home";
import Question from "../page/Question";
import Category from "../page/Question/Category";
import QuestionContent from "../page/Question/QuestionContent";
import Test from "../page/Test";


export const routers = [
  {
    path : '/',
    element : <LayoutDefault/>,
    children : [
      {
        index: true,
        element : <Home/>
      },
      {
        path : 'tests',
        element : <Test/>
      },
      {
        path : 'questions',
        element : <Question/>,
        children: [
          {
            index: true,
            element: <QuestionContent />
          },
          {
            path: 'categories',
            element: <Category />
          }

        ]
      }
    ]
  }
];