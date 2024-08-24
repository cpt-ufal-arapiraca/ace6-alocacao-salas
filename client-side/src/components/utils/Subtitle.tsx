interface subtitleProps {
    subtitle: string
}
function Subtitle({subtitle}:subtitleProps) {
    return (
        <div className="border-b border-border_subTitle text-text_secondary">
            {subtitle}
            </div>
    )
}

export default Subtitle;