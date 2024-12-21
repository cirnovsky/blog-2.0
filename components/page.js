const path = require("path");
const fs = require("fs-extra");
const fls = path.join(process.cwd(), "posts");
const dst = path.join(process.cwd(), "dist");
const hdl = `
    <li>
        <div class="inline light-text">
            {{{date}}}
        </div>
        <a href="../dist/posts/{{{page}}}/{{{post}}}.html">{{{title}}}</a>
    </li>`;
const tmpl = fs.readFileSync(path.join(process.cwd(), "components", "page.html"), 'utf-8');

function cvdct(str) {
    const res = {};
    str.split('\n')
        .forEach((ln) => {
            ln = ln.trim();
            if (!ln || ln.startsWith('#'))
                return;
            const tmp = ln.match(/^([^:]+):\s*(.*)$/);
            const key = tmp[1].trim();
            let value = tmp[2].trim();
            if (value.startsWith('\'') || value.startsWith('\"'))
                value = value.slice(1);
            if (value.endsWith('\'') || value.endsWith('\"'))
                value = value.slice(0, -1);
            if (value.startsWith('[') && value.endsWith(']'))
                value = value.slice(1, -1).map((x) => x.trim());
            else if (/^\d+$/.test(value))
                value = parseInt(value, 10);
            else if (/^\d+\.\d+$/.test(value))
                value = parseFloat(value);
            else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')
                value = value.toLowerCase() === 'true';
            res[key] = value;
        });
    return res;
}

function conv(page, post) {
    const dir = path.join(fls, page, post);
    const md = require("marked");
    const cnt = fs.readFileSync(dir, 'utf-8');
    const tmp = cnt.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (tmp == null) {
        console.error(`Motherfucking ${post} is lacking of YAML metadata.`);
        return;
    }
    const meta_ = tmp[1];
    const meta = cvdct(meta_);
    const content = cnt.replace(/^---[\s\S]*?---\n/, '').trim();
    let result = md.parse(content);
    result = `<h1>${meta.title}</h1>`
        + result;
    fs.outputFile(
        path.join(dst, "posts", page, post.replace(".md", ".html")),
        tmpl.replace("{{{title}}}", meta.title)
            .replace("{{{page}}}", result)
    );
    return meta;
}

function list(page) {
    const {format, parseISO} = require('date-fns');
    const dir = path.join(fls, page);
    const ord = [];
    const all = fs.readdirSync(dir)
        .filter(x => x.endsWith('.md'))
        .map((x) => {
            ord.push(conv(page, x));
            return hdl.replace("{{{title}}}", ord.at(-1).title)
                .replace("{{{page}}}", page)
                .replace("{{{post}}}", x.slice(0, -3))
                .replace("{{{date}}}", `<time dateTime=${ord.at(-1).date}>${format(parseISO(ord.at(-1).date), 'LLL dd, yyy')}</time>`);
        })
    const n = ord.length;
    let id = Array.from({ length: n }, (_, i) => i);
    id = id.sort((a, b) => {
        if (ord[a].date < ord[b].date)
            return 1;
        else
            return -(ord[a].date > ord[b].date);
    });
    const res = [];
    for (var i = 0; i < n; ++i)
        res.push(all[id[i]]);
    return res.join('\n');
}

require("./index.json").forEach(
    (cur) => {
        fs.outputFile(
            path.join(dst, cur + ".html"),
            tmpl.replace("{{{title}}}", cur)
                .replace("{{{page}}}", list(cur))
        );
    }
);