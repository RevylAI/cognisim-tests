# CogniSim Github Action


Setup Github Action to run CogniSim on your repository.


SETUP


Create CogniSim API key on settings Page


Add the following code to your workflow file
```
- uses: actions/checkout@v3
  with:
    fetch-depth: 0

- name: Run tests using CogniSim
  uses: CogniSim/cognisim-tests@v1
  env:
    COGNISIM_API_KEY: ${{ secrets.COGNISIM_API_KEY }}
  with:
    test-id: <test-id>

```