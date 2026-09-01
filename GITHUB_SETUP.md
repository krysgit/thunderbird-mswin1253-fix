# First-time GitHub setup

1. Create a new **Public** repository on GitHub, for example `thunderbird-mswin1253-fix`.
2. Do not initialize it with another README, license, or `.gitignore` if you plan to upload this folder as-is.
3. In this folder run:

```bash
git init
git add .
git commit -m "Initial release"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/thunderbird-mswin1253-fix.git
git push -u origin main
```

4. Publish v1.0.0 by creating and pushing the tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The included GitHub Actions workflow will create the GitHub Release and attach `mswin1253-greek-fix-v1.0.0.xpi` automatically.

If GitHub Actions cannot create a release because repository workflow permissions are restricted, open **Settings → Actions → General → Workflow permissions** and allow **Read and write permissions**, then rerun the workflow.
