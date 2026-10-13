<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Home page visuals use lucide line icons in shared accent icon containers, not product screenshots, so the page stays light and consistent.
- Hero and contact forms share validated, in-memory request details; without a configured delivery service, hero submission hands off to Contact Us and never claims delivery.
- Motion uses lightweight CSS and the existing intersection observer, with reduced-motion overrides, to avoid unnecessary animation dependencies.
