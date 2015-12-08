const jsyaml = require('js-yaml')
const fs = require('fs')

fs.readFile('questions.txt', 'utf8', function(err, data) {
  const { questions
        , professor
        , date
        , title
        } = jsyaml.load(data)
  console.log(`${title} by ${professor}`)
  console.log(date)
  const processed = questions.map(q => {
    const { question
          , fill
          , matching
          } = q
    if (question) {
      const { answer, options } = q
      console.log(question)
      console.log(answer)
      console.log(options)
      return  { answer
              , displayOptions:
                [ answer, ...options ]
              , displayTitle:
                question
              }
    } else if (fill) {
      const { withBlank, solution } =
        parseEquals(fill)
      return  { answer:
                solution[0]
              , displayTitle:
                withBlank
              }
    } else if (matching) {
      const { solutions } = q
      solutions
        .map(sol => parseEquals(sol))
    }
  })
})

let eq = /=.*=/
function parseEquals(s) {
  const solution = eq.exec(s)
  return (
    { withBlank:
        s.replace(solution, '<span class="blank"/>')
    , solution
    }
  )
}
