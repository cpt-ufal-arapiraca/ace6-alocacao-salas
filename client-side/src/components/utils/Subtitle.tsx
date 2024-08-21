interface subtitleProps {
    subtitle: string
}
function Subtitle({subtitle}:subtitleProps) {
    return (
        <div className="border-b-2 text-text_secondary">
            {subtitle}
            </div>
    )
}

export default Subtitle;