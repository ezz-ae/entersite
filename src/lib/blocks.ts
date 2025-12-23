'use client';

import { Heading1, Text, Image, CheckSquare, List, Map, BarChart, MessageCircle, Users, Sun, Star, Phone } from 'lucide-react';
import type { BlockConfig } from './types';

export const availableBlocks: BlockConfig[] = [
    {
        type: 'hero',
        name: 'Hero Section',
        category: 'Heroes',
        icon: Sun,
        fields: [
            { name: 'headline', label: 'Headline', type: 'text' },
            { name: 'subtext', label: 'Subtext', type: 'textarea' },
            { name: 'backgroundImage', label: 'Background Image', type: 'image' },
            { name: 'ctaText', label: 'Button Text', type: 'text' },
        ]
    },
     {
        type: 'launch-hero',
        name: 'Launch Hero',
        category: 'Heroes',
        icon: Sun,
        fields: [
            { name: 'headline', label: 'Headline', type: 'text' },
            { name: 'subtext', label: 'Subtext', type: 'textarea' },
            { name: 'backgroundImage', label: 'Background Image', type: 'image' },
            { name: 'ctaText', label: 'Button Text', type: 'text' },
        ]
    },
    {
        type: 'cta-form',
        name: 'Call to Action Form',
        category: 'Forms',
        icon: Phone,
        fields: [
            { name: 'headline', label: 'Headline', type: 'text' },
            { name: 'subtext', label: 'Subtext', type: 'textarea' },
        ]
    },
    {
        type: 'project-detail',
        name: 'Project Details',
        category: 'Content',
        icon: Text,
        fields: []
    },
    {
        type: 'gallery',
        name: 'Image Gallery',
        category: 'Media',
        icon: Image,
        fields: [
            { name: 'headline', label: 'Headline', type: 'text' },
        ]
    },
    {
        type: 'listing-grid',
        name: 'Listing Grid',
        category: 'Listings',
        icon: List,
        fields: [
             { name: 'headline', label: 'Headline', type: 'text' },
        ]
    },
    {
        type: 'map',
        name: 'Map',
        category: 'Content',
        icon: Map,
        fields: [
            { name: 'headline', label: 'Headline', type: 'text' },
        ]
    },
    {
        type: 'roi-calculator',
        name: 'ROI Calculator',
        category: 'Tools',
        icon: BarChart,
        fields: []
    },
    {
        type: 'chat-widget',
        name: 'Chat Widget',
        category: 'Advanced',
        icon: MessageCircle,
        fields: [
            { name: 'welcomeMessage', label: 'Welcome Message', type: 'textarea' },
        ]
    },
];

export const getBlockConfig = (type: string): BlockConfig | undefined => {
    return availableBlocks.find(block => block.type === type);
};
