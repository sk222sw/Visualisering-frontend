export default {
  matrix: {
    data: [{
      id: 1,
      project: "linux",
      githubUser: "torvalds",
      fileName: "bug.h",
      contributors: ["rjarzmik", "bjdooks-ct", "arndb"],
      sourceCode: `void hook_fault_code(int nr, int (*fn)(unsigned long, unsigned int,
  struct pt_regs *),
int sig, int code, const char *name);

void hook_ifault_code(int nr, int (*fn)(unsigned long, unsigned int,
  struct pt_regs *),
int sig, int code, const char *name);`

    }]
  },
  settings: {
    time: null
  },
  sphere: {
    data: [
    {lat: 56.878655, lng: 14.819965, time: 300},
    {lat: 54.242091, lng: 14.727779, time: 1020},
    {lat: 39.399872, lng: -8.224454, time: 824},
    {lat: 0, lng: 180, time: 404},
    {lat: 0, lng: 90, time: 5083},
    {lat: 0, lng: -90, time: 1204},
    {lat: 0, lng: 0, time: 10}
    ]
  },
  codeCrawl: {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi officia adipisci numquam eos sit. Autem vitae accusamus corporis laudantium ipsa ad impedit, quis possimus omnis rem excepturi illo sunt reprehenderit!"
  }
};
