
// ref: https://submittable.help/en/articles/1711811-what-kinds-of-file-types-can-i-accept-in-my-form
const Documents = Object.freeze({
    pdf: 'Portable Document Format File',
    docx: 'Microsoft Word Open XML Document',
    xlsx: 'Microsoft Excel Open XML Spreadsheet',
    rtf: 'Rich Text Format File',
    odt: 'Open Document Text File',
    doc: 'Microsoft Word Document',
    txt: 'Plain Text File',
    wpf: 'WordPerfect Form',
    wpd: 'WordPerfect Document',
    ppt: 'PowerPoint Presentation',
    pptx: 'PowerPoint Open XML Presentation',
});


const Photography = Object.freeze({
    jpg: 'JPEG Image File',
    tiff: 'Tagged Image File Format',
    svg: 'Scalable Vector Graphics File',
    gif: 'Graphical Interchange Format File',
    png: 'Portable Network Graphic',
});


const Audio = Object.freeze({
    mp3: 'MP3 Audio File',
    wav: 'WAVE Audio File',
    aac: 'Advanced Audio Coding File',
    aiff: 'Audio Interchange File Format',
    m4a: 'MPEG-4 Video File',
    ogg: 'Ogg Vorbis Audio File',
    flac: 'Free Lossless Audio Codec File',
    wma: 'Windows Media Audio File'
});


const Video = Object.freeze({
    mp4: 'MPEG-4 Video File',
    avi: 'Audio Video Interleave File',
    _3gp: '3GPP Multimedia File',
    webm: 'WebM Video File',
    mkv: 'Matroska Video File',
    mov: 'Apple QuickTime Movie',
    mpg: 'MPEG Video File',
    flv: 'Animate Video File',
    m4v: 'iTunes Video File'
});


const Others = Object.freeze({
    zip: 'Zipped File',
    key: 'Software License Key File'
});


module.exports = {
    Documents,
    Photography,
    Audio,
    Video,
    Others
}