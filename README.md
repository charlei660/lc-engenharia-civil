# Galeria responsiva — Exemplo

Este é um exemplo pronto de galeria de fotos responsiva com lightbox, otimizada para servir imagens adequadas por dispositivo (srcset), lazy-loading e WebP quando disponível.

Como usar
1. Copie os arquivos para o seu repositório:
   - `index.html`
   - `css/styles.css`
   - `js/gallery.js`
   - crie uma pasta `images/` com as fotos (veja abaixo o padrão de nomes).

2. Padrão de nomes recomendado (por imagem):
   - photo1-480.jpg, photo1-800.jpg, photo1-1200.jpg (tamanhos para srcset)
   - photo1-480.webp, photo1-800.webp, photo1-1200.webp (opcional, WebP)
   - photo1-large.jpg (versão maior para o lightbox)
   - Repita para photo2-*, photo3-*, etc.

3. Substitua captions e atributos `alt` no `index.html` por textos descritivos (importante para SEO e acessibilidade).

Gerar WebP / redimensionar (exemplos)
- Convertendo JPG para WebP (cwebp):
  - batch no Linux/macOS:
    - for f in images/*.jpg; do cwebp -q 80 "$f" -o "${f%.*}.webp"; done
- Redimensionar com ImageMagick (criar 480/800/1200):
  - convert photo.jpg -resize 1200x photo-1200.jpg
  - convert photo.jpg -resize 800x photo-800.jpg
  - convert photo.jpg -resize 480x photo-480.jpg
- Automatizar (bash):
  - for f in images/orig/*.jpg; do base=$(basename "$f" .jpg); convert "$f" -resize 480 "images/${base}-480.jpg"; convert "$f" -resize 800 "images/${base}-800.jpg"; convert "$f" -resize 1200 "images/${base}-1200.jpg"; convert "$f" -resize 2048 "images/${base}-large.jpg"; done

Publicar no GitHub Pages
1. Commit e push para o branch `main` (ou `master`).
2. No GitHub > Settings > Pages, escolha a branch `main` e root (ou use `gh-pages`).
3. Aguarde alguns minutos e o site ficará disponível em `https://<seu-usuario>.github.io/<seu-repo>/`.

Melhorias sugeridas
- Usar serviço de imagens (Cloudinary, Imgix) para transformações e CDN.
- Implementar lazy-loading mais avançado com Intersection Observer se precisar suportar many imagens.
- Adicionar SEO/Open Graph meta tags e sitemap.xml.
- Adicionar um formulário de contato (Netlify Forms ou Formspree) para captura de leads.

Se quiser, eu:
- adapto este layout ao HTML/CSS atual do seu repositório,
- crio o README final do projeto,
- ou configuro o deploy no GitHub Pages passo a passo (posso criar os commits se autorizar).
